import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface Article {
    title: string;
    description: string;
    date: string
}

@Injectable()
export class ArticleService {
    private token: string;

    constructor(private http: HttpClient, private router: Router) { }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }

    private request(method: 'post' | 'get', article?: Article): Observable<any> {
        let base;

        if (method === 'post') {
            base = this.http.post(`http://localhost:3000/api/articles`, article);
        } else {
            base = this.http.get(`http://localhost:3000/api/articles`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }

        return base;
    }

    public storeArticle(article: Article) {
        return this.request('post', article);
    }

    public getArticles() {
        return this.request('get');
    }
}