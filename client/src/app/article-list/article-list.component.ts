import { Component } from '@angular/core';
import { ArticleService, Article } from '../article/article.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './article-list.component.html',
    selector: 'article-list'
})
export class ArticleListComponent {
    articles: Article[]

    constructor(private articleService: ArticleService, private router: Router) {
        this.articleService.getArticles()
            .subscribe((articles: Article[]) => {
                this.articles = articles;
            });
    }
}