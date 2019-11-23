import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    public storeArticle(article: Article) {
        return this.http.post(`http://localhost:3000/api/articles`, article);
    }

    public updateArticle(article: Article) {
        return this.http.put(`http://localhost:3000/api/articles/${article._id}`, article);
    }

    public getArticles(params?: HttpParams) {
        return this.http.get(`http://localhost:3000/api/articles`, { headers: { Authorization: `Bearer ${this.getToken()}` }, params: params });
    }

    public getArticle(_id: string) {
        return this.http.get(`http://localhost:3000/api/articles/${_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    public deleteArticle(article: Article) {
        return this.http.delete(`http://localhost:3000/api/articles/${article._id}`);
    }
}