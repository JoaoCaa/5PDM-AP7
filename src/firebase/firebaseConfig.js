import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do seu aplicativo Firebase
 
const firebaseConfig = {
  apiKey: "AIzaSyB_IWvq5BLtqSu8vhw-HwsULFT4SfdSy5o",
  authDomain: "poa-8fb9b.firebaseapp.com", // Seu AuthDomain
  projectId: "poa-8fb9b", // Seu Project ID
  storageBucket: "poa-8fb9b.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};



// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);
// Opcional: export default app;