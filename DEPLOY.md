# Despliegue en IIS con NSSM - blck-sheep.com

## Requisitos previos
- IIS instalado con:
  - URL Rewrite Module
  - Application Request Routing (ARR)
- NSSM (Non-Sucking Service Manager)
- Node.js instalado
- PostgreSQL configurado

---

## 1. Build del Frontend

```powershell
cd D:\Paginas\PagBS
pnpm install
pnpm build
```

Esto genera la carpeta `dist/` con los archivos estáticos.

---

## 2. Configurar el Backend con NSSM

### Instalar dependencias del backend:
```powershell
cd D:\Paginas\PagBS\Back
pnpm install
```

### Copiar el archivo de entorno de producción:
```powershell
copy .env.production .env
```

### Crear el servicio con NSSM:

```powershell
nssm install PagBSBackend
```

En el editor de NSSM configurar:

| Campo              | Valor                                    |
|--------------------|------------------------------------------|
| **Path**           | `C:\Program Files\nodejs\node.exe`       |
| **Startup directory** | `D:\Paginas\PagBS\Back`               |
| **Arguments**      | `server.js`                              |

> **Nota:** Si usas NVM, la ruta de Node será algo como `C:\nvm4w\nodejs\node.exe`

### Iniciar el servicio:
```powershell
nssm start PagBSBackend
```

### Comandos útiles de NSSM:
```powershell
nssm status PagBSBackend    # Ver estado
nssm stop PagBSBackend      # Detener
nssm restart PagBSBackend   # Reiniciar
nssm remove PagBSBackend    # Eliminar servicio
```

---

## 3. Configurar IIS

### 3.1 Habilitar ARR como proxy

1. Abrir **IIS Manager**
2. Seleccionar el servidor (nodo raíz)
3. Doble clic en **Application Request Routing Cache**
4. En el panel derecho, clic en **Server Proxy Settings**
5. Marcar ✅ **Enable proxy**
6. Clic en **Apply**

### 3.2 Crear el sitio web

1. En IIS Manager, clic derecho en **Sites** → **Add Website**
2. Configurar:
   - **Site name:** `blck-sheep.com`
   - **Physical path:** `D:\Paginas\PagBS\dist`
   - **Binding:** 
     - Type: `http`
     - Host name: `blck-sheep.com`
     - Port: `80`

3. Agregar binding adicional para `www`:
   - Host name: `www.blck-sheep.com`

### 3.3 Verificar web.config

El archivo `web.config` ya está en la carpeta `dist/` y contiene:
- Regla de proxy ARR para `/api/*` → `http://localhost:3019`
- Regla SPA para redirigir rutas a `index.html`
- Tipos MIME para archivos modernos
- Headers de seguridad

---

## 4. Configurar HTTPS (SSL)

### Opción A: Certificado gratuito con win-acme

```powershell
# Descargar win-acme desde https://www.win-acme.com/
wacs.exe
```

Seguir el asistente para generar certificado Let's Encrypt.

### Opción B: Certificado propio

1. En IIS, ir a **Server Certificates**
2. Importar o crear certificado
3. Agregar binding HTTPS al sitio:
   - Type: `https`
   - SSL Certificate: seleccionar tu certificado
   - Host name: `blck-sheep.com`

---

## 5. Estructura de archivos en producción

```
D:\Paginas\PagBS\
├── dist\                    ← Frontend (IIS apunta aquí)
│   ├── index.html
│   ├── assets\
│   └── web.config           ← Reglas URL Rewrite + ARR
│
└── Back\                    ← Backend (NSSM ejecuta esto)
    ├── server.js
    ├── .env                 ← Variables de producción
    ├── routes\
    └── node_modules\
```

---

## 6. Verificar el despliegue

1. **Verificar que el backend está corriendo:**
   ```powershell
   curl http://localhost:3019
   # Debe responder: "API funcionando :3"
   ```

2. **Verificar el sitio:**
   - Abrir `http://blck-sheep.com`
   - Verificar que las llamadas a `/api/*` funcionan

3. **Ver logs del servicio:**
   ```powershell
   nssm status PagBSBackend
   ```

---

## 7. Troubleshooting

### Error 502 Bad Gateway
- Verificar que el servicio NSSM está corriendo
- Verificar que el puerto 3019 está libre

### Error 500 en API
- Revisar logs de Node.js
- Verificar conexión a PostgreSQL

### ARR no funciona
- Verificar que ARR está habilitado como proxy
- Reiniciar IIS: `iisreset`

### Rutas SPA no funcionan (404)
- Verificar que URL Rewrite está instalado
- Verificar que web.config está en la carpeta dist

---

## Puertos utilizados

| Servicio | Puerto |
|----------|--------|
| Frontend (IIS) | 80 / 443 |
| Backend (Express) | 3019 |
| PostgreSQL | 5432 |
