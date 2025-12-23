import { useState, useEffect } from "react";
import { User, Mail, Upload, X, Save, Eye, EyeOff } from "lucide-react";

export default function UserProfileModal({ onClose, userId, token }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/usuarios/${userId}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error("Error al cargar datos");
      
      const data = await res.json();
      setUserData(data);
      setFormData({
        nombre: data.nombre || "",
        correo: data.correo || "",
        usuario: data.usuario || "",
        newPassword: "",
        confirmPassword: ""
      });
      
      if (data.foto) {
        setPreviewImage(`/api/usuarios/${userId}/photo?t=${Date.now()}`);
      }
      
      setLoading(false);
    } catch (err) {
      setError("No se pudo cargar el perfil");
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.correo?.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido";
    }

    if (!formData.usuario?.trim()) {
      newErrors.usuario = "El usuario es requerido";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona una imagen válida");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    const formDataImg = new FormData();
    formDataImg.append("foto", file);

    try {
      const res = await fetch(`/api/usuarios/${userId}/upload-foto`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataImg
      });

      if (!res.ok) throw new Error("Error al subir imagen");
      
      const data = await res.json();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Error al subir la imagen");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setError(null);

    try {
      const updateData = {
        nombre: formData.nombre,
        correo: formData.correo,
        usuario: formData.usuario
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const res = await fetch(`/api/usuarios/${userId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al actualizar");
      }

      setSuccess(true);
      setFormData(prev => ({
        ...prev,
        newPassword: "",
        confirmPassword: ""
      }));

      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 max-w-2xl w-full mx-2 animate-scaleIn">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full mx-2 my-4 sm:my-8 animate-scaleIn">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-3 sm:px-6 py-3 sm:py-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden xs:inline">Mi Perfil</span>
            <span className="xs:hidden">Perfil</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex flex-col items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 sm:p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-all border-2 border-orange-500">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
              Haz clic en el ícono para cambiar tu foto de perfil
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="font-semibold">Rol: </span>
              <span className="text-orange-600 font-bold">
                {userData?.rol === "admin" ? "Administrador" : "Usuario"}
              </span>
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 text-black focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 text-black focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.correo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tu@email.com"
              />
              {errors.correo && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.correo}</p>
              )}
            </div>

            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Usuario *
              </label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 text-black focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.usuario ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tu_usuario"
              />
              {errors.usuario && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.usuario}</p>
              )}
            </div>

            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Cambiar Contraseña (opcional)
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 text-black focus:ring-orange-500 focus:border-transparent transition-all pr-10 sm:pr-12 text-sm sm:text-base ${
                        errors.newPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 text-black focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Confirma tu nueva contraseña"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg animate-bounce-in text-xs sm:text-sm">
              ¡Perfil actualizado exitosamente!
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm sm:text-base"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out;
        }

        @media (max-width: 400px) {
          .xs\:hidden {
            display: none;
          }
          .xs\:inline {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}