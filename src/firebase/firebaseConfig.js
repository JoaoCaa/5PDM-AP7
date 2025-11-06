import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do seu aplicativo Firebase
 
const firebaseConfig = {
  apiKey: "AIzaSyCGAd81-1DQHHtwZqIHp6EUnipTrxISBoA",
  authDomain: "ap-7-9f578.firebaseapp.com", // Seu AuthDomain
  projectId: "ap-7-9f578", // Seu Project ID
  storageBucket: "ap-7-9f578.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};



// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);
// Opcional: export default app;