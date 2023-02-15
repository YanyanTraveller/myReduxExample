import * as Msal from "msal";
import { applyMiddleware } from "redux";
import { async } from "rxjs";

const  ENDPOINT:string = "https://httpqas26-frontend-qasazap-prod-dsm02p.qas.binginternal.com/completions";
const token:string = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkVjSDc4Wng4OFd3UE56a1U3anV2LWxOSGxEYnVnRzVJWVRHbWZKWDlSLTAiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNjc2MzY3MzU5LCJuYmYiOjE2NzYzNjczNTksImV4cCI6MTY3NjM3MTYwNiwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iXSwiYWlvIjoiQVZRQXEvOFRBQUFBSWI4MHdzcWM2U29wWWwvbTdnbmpmclA1QzdTREVMS1FHL2UrcmJreU5BdllQN0xQKzdzVkoxc3dtN1pqWUhId25ycmN0VW42Y01PNmkvN1ZKaHBodzBpbUhJeEI0eTdYUWRVSlJSTTJvVHc9IiwiYW1yIjpbInJzYSIsIndpYSIsIm1mYSJdLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UzNjUgU2hlbGwgV0NTUy1DbGllbnQiLCJhcHBpZCI6Ijg5YmVlMWY3LTVlNmUtNGQ4YS05ZjNkLWVjZDYwMTI1OWRhNyIsImFwcGlkYWNyIjoiMCIsImNvbnRyb2xzIjpbImFwcF9yZXMiXSwiY29udHJvbHNfYXVkcyI6WyI4OWJlZTFmNy01ZTZlLTRkOGEtOWYzZC1lY2Q2MDEyNTlkYTciLCIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiXSwiZGV2aWNlaWQiOiIzNzk3YjkzNy04NzdlLTQ0NTItODVkOS0xNzg0YjRmNjQ2ZDAiLCJmYW1pbHlfbmFtZSI6Ik11IiwiZ2l2ZW5fbmFtZSI6IllhbnlhbiIsImlkdHlwIjoidXNlciIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMTY3LjIyMC4yNTUuNSIsIm5hbWUiOiJZYW55YW4gTXUiLCJvaWQiOiIwYTIxZmJlOC04YmYwLTRjZDYtODVjZC1kMjQwYzMwNTZkZjEiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjE0Njc3MzA4NS05MDMzNjMyODUtNzE5MzQ0NzA3LTI3ODg2MTgiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDFDRDREMzg3QSIsInJoIjoiMC5BUUVBdjRqNWN2R0dyMEdScXkxODBCSGJSd01BQUFBQUFBQUF3QUFBQUFBQUFBQWFBR3MuIiwic2NwIjoiZW1haWwgRmlsZXMuUmVhZFdyaXRlIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZFdyaXRlIiwic2lnbmluX3N0YXRlIjpbImR2Y19tbmdkIiwiZHZjX2NtcCIsImR2Y19kbWpkIiwiaW5rbm93bm50d2siLCJrbXNpIl0sInN1YiI6IlBTX216aTdwa1pGbFgyV1VKLXJORWtGUHMtOWpzbEhjTGdvZUJxWGtjSUUiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiV1ciLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1bmlxdWVfbmFtZSI6Inlhbnlhbm11QG1pY3Jvc29mdC5jb20iLCJ1cG4iOiJ5YW55YW5tdUBtaWNyb3NvZnQuY29tIiwidXRpIjoiX2xGaWJpdndYMC1DczdzMElkTUlBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJlRXh2UUtxczZEOGNtLW9IUmVzVklRMkFHTWt0cUl5OWktbl9ES2M0RHlvIn0sInhtc190Y2R0IjoxMjg5MjQxNTQ3fQ.h5228L3UEbgu1aQyLBrOF4acQ0t-9NGgUEhl0y4NVcMthZh6c-IS0Qgfn5Y9JpXd6B4pWIo6JFIauPLhD4qijO-Io52_shnrF3zbABJ89BeXLNLW8xAej1knlo1VZM7K4pSSLTMp46YC9tTx21mGRp5Lz5A3O1W7gYIjBIcYvntqcKkZiLTtdW1k3kcwmBkVkvKXKXXe_6h1OaQGqcxz9af8Ap3DUQEVWHzAaWzcD4b5qAezOPkBfkPxCwdp2iCZKUAy4GvLKiSceyPerjYYH9GulpQUVBDgCtph3A-WEn-obzU08fVHXS_lOc9KTNd3n-rRTMKtAkwwtTdqfpJ27w";
const _SCOPES = ['api://68df66a4-cad9-4bfd-872b-c6ddde00d6b2/access'];

const msalConfig = {
    auth: {
        clientId: '68df66a4-cad9-4bfd-872b-c6ddde00d6b2',
        authority: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
        redirectUri: "https://localhost:3000/gptapi",
    }
};

const msalInstance = new Msal.UserAgentApplication(msalConfig);

// async function getToken(){
//     const accounts = msalInstance.getAllAccounts();
//     let result = null;
//     if(accounts){
//         const chosen = accounts[0];
//         result = msalInstance.acquireTokenSilent(_SCOPES, chosen);
//     }
//     if(!result){
//         const flow = msalInstance.loginPopup();
//     }
//     return result["access_token"];
// }

export async function sendRequest(){
    // const token = getToken();
    const response = await fetch(ENDPOINT,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-ModelType': "text-davinci-002"
        },
        body: JSON.stringify({
            "prompt": ["Portland is a city that", "seattle is good"],
            "max_tokens": 50,
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": null
      })
    });
    if(response.ok) {
        console.log(response);
    }
}

