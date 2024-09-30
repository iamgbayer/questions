import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { Signup } from '@/services/signup'
import * as firebase from 'firebase/auth'

export function useAuth() {
  const httpClient = new GraphQLHttpClient()

  const signUp = async (email: string, password: string) => {
    const user = await firebase.createUserWithEmailAndPassword(firebase.getAuth(), email, password)
    await new Signup(httpClient).execute({
      email,
      providerId: user.user.uid,
      provider: 'email'
    })
    return user
  }

  const signIn = async (email: string, password: string) => {
    const user = await firebase.signInWithEmailAndPassword(firebase.getAuth(), email, password)
    return user
  }

  async function signInWithGoogle(): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, async function(token) {
        if (chrome.runtime.lastError || !token) {
          reject(chrome.runtime.lastError || new Error('Failed to get auth token'));
          return;
        }

        // Create a credential with the token
        const credential = firebase.GoogleAuthProvider.credential(null, token);

        try {
          // Sign in to Firebase with the credential
          const userCredential = await firebase.signInWithCredential(firebase.getAuth(), credential);
          resolve(userCredential.user);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  return {
    signUp,
    signIn,
    signInWithGoogle
  }
}
