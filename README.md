# Wedding Invitation Website

Una elegante página web de invitación de boda construida con Next.js y Tailwind CSS.

## Características

- 🔐 **Protección con contraseña**: Acceso controlado con cookie persistente
- 💌 **Invitación elegante**: Diseño romántico y responsive
- ⏰ **Contador regresivo**: Cuenta atrás hasta el gran día
- 📍 **Detalles del evento**: Fecha, hora, ubicación con mapa integrado
- ✅ **Formulario RSVP**: Confirmación de asistencia con Firebase Firestore
- 🎨 **Animaciones suaves**: Transiciones elegantes con Framer Motion
- 📱 **Responsive**: Optimizado para dispositivos móviles

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd wedding-invitation
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Completa tu archivo `.env.local` con:
   - Configuración de Firebase
   - Contraseña de acceso
   - Detalles del evento
   - Información de contacto

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Configura las reglas de seguridad:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      allow read, write: if true;
    }
  }
}
```

## Estructura del Proyecto

```
wedding-invitation/
├── app/
│   ├── api/validate-password/
│   │   └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Countdown.tsx
│   ├── PasswordForm.tsx
│   ├── RSVPForm.tsx
│   └── WeddingInvitation.tsx
├── lib/
│   ├── auth.ts
│   └── firebase.ts
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Variables de Entorno

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Access Control
ACCESS_KEY=your_secret_password

# Wedding Details
NEXT_PUBLIC_WEDDING_DATE=2024-12-31T18:00:00
NEXT_PUBLIC_VENUE_NAME=Venue Name
NEXT_PUBLIC_VENUE_ADDRESS=Full Address
NEXT_PUBLIC_PIXIESET_URL=https://pixieset.com/your-gallery
NEXT_PUBLIC_CONTACT_EMAIL=contact@yourwedding.com
NEXT_PUBLIC_CONTACT_PHONE=+34 600 000 000
```

## Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Despliega automáticamente

### Otros Proveedores

El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## Personalización

### Colores y Estilos

Edita `tailwind.config.js` para cambiar la paleta de colores:

```javascript
colors: {
  rose: {
    // Tu paleta personalizada
  },
}
```

### Contenido

Modifica los textos y configuraciones en:
- `components/WeddingInvitation.tsx`
- Variables de entorno
- Estilos CSS en `app/globals.css`

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React
- **Tailwind CSS**: Estilos utilitarios
- **Framer Motion**: Animaciones
- **Firebase Firestore**: Base de datos
- **React Hook Form**: Gestión de formularios
- **TypeScript**: Tipado estático

## Licencia

Este proyecto está bajo la Licencia MIT.

## Soporte

Para preguntas o problemas:
1. Revisa la documentación
2. Verifica la configuración de Firebase
3. Comprueba las variables de entorno
4. Consulta los logs de la consola
