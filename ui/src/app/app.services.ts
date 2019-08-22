import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    private apiHostName = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    public signup(data: { username: string, password: string, name: string }) {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiHostName}/signup`, data, { headers });
    };

    public login(credentials: { username: string, password: string }) {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.apiHostName}/login?username=${credentials.username}&password=${credentials.password}`, { headers });
    };

    public addTransaction(data: any) {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token') });
        return this.http.post(`${this.apiHostName}/add-transaction`, { data }, { headers });
    };

    public getTransactions() {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token') });
        return this.http.get(`${this.apiHostName}/get-transactions`, { headers });
    };
}