import { Component } from '@angular/core';
import { ArticleService, Article } from '../article/article.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
    templateUrl: './article-list.component.html',
    selector: 'article-list'
})
export class ArticleListComponent {
    articles: Article[]
    searchText: '';

    constructor(private articleService: ArticleService, private router: Router) {
    }

    ngOnInit() {
        this.searchText = '';
        this.getArticles({});
    }

    getArticles(options: Object) {
        let params = new HttpParams()
            .set('searchText', this.searchText);
        for (let option in options) {
            params = params.set(option, options[option]);
        }
        this.articleService.getArticles(params)
            .subscribe((articles: Article[]) => {
                this.articles = articles;
            });
    }
}