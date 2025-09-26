import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface RSVPFormData {
    name: string;
    email: string;
    guests: string;
    attendance: string;
    dietary: string;
    message: string;
}

interface RSVPFormProps {
    onSubmitSuccess?: () => void;
    onSubmitError?: (error: string) => void;
}

export default function RSVPForm({ onSubmitSuccess, onSubmitError }: RSVPFormProps) {
    const [formData, setFormData] = useState<RSVPFormData>({
        name: '',
        email: '',
        guests: '1',
        attendance: '',
        dietary: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1️⃣ Enviar a Formspree
            const resFormspree = await fetch("https://formspree.io/f/xdklbgkz", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData),
            });
            console.log("Formspree status:", resFormspree.status);

            if (!resFormspree.ok) throw new Error("Error al enviar a Formspree");

            // 2️⃣ Enviar a Google Sheets
            const resSheets = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log("Sheets status:", resSheets.status);

            if (!resSheets.ok) throw new Error("Error al guardar en Google Sheets");

            setIsSubmitted(true);
            onSubmitSuccess?.();
        } catch (error) {
            console.error("Error completo:", error);
            const errorMessage = "Error al enviar la confirmación. Por favor, inténtalo de nuevo.";
            alert(errorMessage);
            onSubmitError?.(errorMessage);
        } finally {
            setIsSubmitting(false);
        }

    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setFormData({
            name: '',
            email: '',
            guests: '1',
            attendance: '',
            dietary: '',
            message: ''
        });
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
            >
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-8">
                    <Heart className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-light text-black mb-4">Gracias</h3>
                <p className="text-gray-600 mb-8">Hemos recibido tu confirmación</p>

                <button
                    onClick={resetForm}
                    className="text-sm text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black"
                >
                    Enviar otra confirmación
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                        NOMBRE COMPLETO *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                        EMAIL *
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                        placeholder="tu@email.com"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                        INVITADOS
                    </label>
                    <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black focus:outline-none focus:border-black transition-colors appearance-none disabled:opacity-50"
                    >
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                        ASISTENCIA *
                    </label>
                    <select
                        name="attendance"
                        required
                        value={formData.attendance}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black focus:outline-none focus:border-black transition-colors appearance-none disabled:opacity-50"
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí, asistiré</option>
                        <option value="no">No podré asistir</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                    RESTRICCIONES ALIMENTARIAS
                </label>
                <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                    placeholder="Vegetariano, sin gluten, etc."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                    MENSAJE
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50"
                    placeholder="Algo que quieras decirnos"
                />
            </div>

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full border-2 border-black bg-black text-white py-4 font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
            >
                {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR ASISTENCIA'}
            </motion.button>
        </form>
    );
}