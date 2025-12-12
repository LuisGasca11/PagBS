// UsersPanel.jsx - MODIFICADO
import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, X, Shield, User, Lock, CheckCircle, XCircle } from "lucide-react";

export default function UsersPanel({ onClose }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ usuario: "", password: "", rol: "user", activo: true });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

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

  const submit = async () => {
    if (!form.usuario || (!form.password && !editingId)) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    setLoading(true);
    const { token } = JSON.parse(localStorage.getItem("session"));

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/usuarios/${editingId}` : "/api/usuarios";

    const body =
      editingId && !form.password
        ? { usuario: form.usuario, rol: form.rol, activo: form.activo }
        : form;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setForm({ usuario: "", password: "", rol: "user", activo: true });
    setEditingId(null);
    setLoading(false);
    loadUsers();
  };

  const remove = async (id) => {
    if (!confirm("¿Eliminar este usuario?")) return;

    const { token } = JSON.parse(localStorage.getItem("session"));

    await fetch(`/api/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadUsers();
  };

  const startEdit = (user) => {
    setEditingId(user.id_usuario);
    setForm({
      usuario: user.usuario,
      password: "",
      rol: user.rol,
      activo: user.activo,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ usuario: "", password: "", rol: "user", activo: true });
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Usuario */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Nombre de usuario"
                  value={form.usuario}
                  onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña {editingId && "(opcional)"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder={editingId ? "Dejar vacío para no cambiar" : "Contraseña"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
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
                value={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.value === "true" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-end">
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
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
                    Rol
                  </th>
                  <th className="px6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
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
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${u.rol === 'admin' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                          {u.rol === 'admin' ? (
                            <Shield className="w-4 h-4 text-orange-600" />
                          ) : (
                            <User className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{u.usuario}</div>
                          {currentUserId === u.id_usuario && (
                            <span className="text-xs text-orange-600 font-medium">(Tú)</span>
                          )}
                        </div>
                      </div>
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