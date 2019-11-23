import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { ArticleListComponent } from '../article-list/article-list.component';

export interface Article {
    _id: string;
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

    private request(method: 'post' | 'get' | 'put' | 'delete', article?: Article, _id?: string): Observable<any> {
        let base;

        if (method === 'post') {
            base = this.http.post(`http://localhost:3000/api/articles`, article);
        }
        else if (method === 'put') {
            base = this.http.put(`http://localhost:3000/api/articles/${_id}`, article);
        }
        else if (_id) {
            base = this.http.get(`http://localhost:3000/api/articles/${_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }
        else {
            base = this.http.get(`http://localhost:3000/api/articles`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }

        return base;
    }

    public storeArticle(article: Article) {
        return this.request('post', article);
    }

    public updateArticle(article: Article) {
        return this.request('put', article, article._id);
    }

    public getArticles() {
        return this.request('get');
    }

    public getArticle(_id: string) {
        return this.request('get', null, _id);
    }
}