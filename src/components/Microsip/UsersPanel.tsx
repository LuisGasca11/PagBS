import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit, X, Shield, User, Lock, CheckCircle, XCircle, Mail, UserCircle, Upload, Camera } from "lucide-react";

interface UserForm {
  usuario: string;
  password: string;
  rol: string;
  activo: boolean;
  nombre: string;
  correo: string;
  foto: string;
}

interface Usuario {
  id_usuario: number;
  usuario: string;
  rol: string;
  activo: boolean;
  nombre: string;
  correo: string;
  foto: string;
}

interface Session {
  user: {
    id_usuario: number;
  };
  token: string;
}

export default function UsersPanel() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [form, setForm] = useState<UserForm>({ 
    usuario: "", 
    password: "", 
    rol: "user", 
    activo: true,
    nombre: "",
    correo: "",
    foto: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionData = localStorage.getItem("session");
    if (sessionData) setSession(JSON.parse(sessionData));
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const sessionData = localStorage.getItem("session");
    if (!sessionData) return;

    const { token } = JSON.parse(sessionData);

    const res = await fetch("/api/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return console.error("No autorizado");

    setUsers(await res.json());
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB");
      return;
    }

    // Validar tipo
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
      alert("Solo se permiten imágenes (JPG, PNG, GIF, WEBP)");
      return;
    }

    setUploadingPhoto(true);

    try {
      const { token } = JSON.parse(localStorage.getItem("session")!);
      const formData = new FormData();
      formData.append("foto", file);

      const res = await fetch(
        `/api/usuarios/${editingId}/upload-foto`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Error al subir la foto");
      }

      const data = await res.json();

      setForm({ ...form, foto: data.foto });
      setPhotoPreview(data.foto);

      await loadUsers();
    
      setForm({ ...form, foto: data.foto });
      setPhotoPreview(data.foto);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al subir la foto");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const removePhoto = () => {
    setForm({ ...form, foto: "" });
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submit = async () => {
    if (!form.usuario || (!form.password && !editingId)) {
      alert("Por favor completa usuario y contraseña");
      return;
    }

    setLoading(true);
    const { token } = JSON.parse(localStorage.getItem("session")!);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/usuarios/${editingId}` : "/api/usuarios";

    const body = editingId && !form.password
      ? { 
           usuario: form.usuario,
            rol: form.rol,
            activo: form.activo,
            nombre: form.nombre,
            correo: form.correo,
            ...(form.foto && { foto: form.foto }),
        }
      : form;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setForm({ 
      usuario: "", 
      password: "", 
      rol: "user", 
      activo: true,
      nombre: "",
      correo: "",
      foto: ""
    });
    setPhotoPreview("");
    setEditingId(null);
    setLoading(false);
    loadUsers();
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;

    const { token } = JSON.parse(localStorage.getItem("session")!);

    await fetch(`/api/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadUsers();
  };

  const startEdit = (user: Usuario) => {
    setEditingId(user.id_usuario);
    setForm({
      usuario: user.usuario,
      password: "",
      rol: user.rol,
      activo: user.activo,
      nombre: user.nombre || "",
      correo: user.correo || "",
      foto: user.foto || ""
    });
    setPhotoPreview(user.foto || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ 
      usuario: "", 
      password: "", 
      rol: "user", 
      activo: true,
      nombre: "",
      correo: "",
      foto: ""
    });
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentUserId = session?.user?.id_usuario;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-full p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
            <p className="text-orange-100 text-sm">Administra roles y permisos</p>
          </div>
        </div>
      </div>

      <div className="p-6 overflow-y-auto">
        
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            {editingId ? (
              <>
                <Edit className="w-5 h-5 text-orange-500" />
                Editar Usuario
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-orange-500" />
                Nuevo Usuario
              </>
            )}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-4">
            {/* Foto de Perfil */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto de Perfil
              </label>
              
              <div className="relative">
                {photoPreview || form.foto ? (
                  <div className="relative group">
                    <img
                      src={photoPreview || form.foto}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-contain border-4 border-gray-200 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all"
                      title="Eliminar foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              
              <label
                htmlFor="photo-upload"
                className={`mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all cursor-pointer flex items-center gap-2 ${
                  uploadingPhoto ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="w-4 h-4" />
                {uploadingPhoto ? "Subiendo..." : "Subir Foto"}
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                JPG, PNG, GIF (máx. 5MB)
              </p>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Usuario */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    placeholder="Nombre de usuario"
                    value={form.usuario}
                    onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña {editingId && "(opcional)"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="password"
                    placeholder={editingId ? "Dejar vacío para no cambiar" : "Contraseña"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Nombre */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Correo */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Rol */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={form.rol}
                  onChange={(e) => setForm({ ...form, rol: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              {/* Activo */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={String(form.activo)}
                  onChange={(e) => setForm({ ...form, activo: e.target.value === "true" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            {editingId && (
              <button
                onClick={cancelEdit}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            )}
            <button
              onClick={submit}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                "Guardando..."
              ) : editingId ? (
                <>
                  <Edit className="w-4 h-4" />
                  Actualizar
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Agregar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr
                    key={u.id_usuario}
                    className="hover:bg-orange-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img
                          src={u.foto}
                          alt={u.usuario}
                          className="w-20 h-20 rounded-full object-contain border-2 border-gray-200 shadow"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{u.usuario}</div>
                          {currentUserId === u.id_usuario && (
                            <span className="text-xs text-orange-600 font-medium">(Tú)</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{u.nombre || "-"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{u.correo || "-"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.rol === "admin"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {u.rol === "admin" ? "Administrador" : "Usuario"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {u.activo ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => startEdit(u)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                          title="Editar usuario"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          disabled={currentUserId === u.id_usuario}
                          title={
                            currentUserId === u.id_usuario
                              ? "No puedes eliminar tu propio usuario"
                              : "Eliminar usuario"
                          }
                          onClick={() => remove(u.id_usuario)}
                          className={`p-2 rounded-lg transition-all duration-200 group ${
                            currentUserId === u.id_usuario
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                        >
                          <Trash2
                            className={`w-4 h-4 ${
                              currentUserId === u.id_usuario
                                ? ""
                                : "group-hover:scale-110 transition-transform"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No hay usuarios registrados</p>
              <p className="text-sm">Agrega el primer usuario usando el formulario</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}