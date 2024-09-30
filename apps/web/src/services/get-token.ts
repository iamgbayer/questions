import * as firebase from "firebase/auth";
export class GetToken {
  public execute() {
    return new Promise<string>((resolve, reject) => {
      firebase.getAuth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken(true)
            .then((token) => {
              resolve(token)
            }).catch((error) => {
              reject(error)
            })
        } else {
          reject('User not found')
        }
      });
    });
  }
}
