import { Component } from '@angular/core';
import { ArticleService, Article } from './article.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './article.component.html'
})



export class ArticleComponent {
    article: Article = {
        title: '',
        description: '',
        date: ''
    };

    constructor(private articleService: ArticleService, private router: Router) { }

    submitArticle() {
        this.articleService.storeArticle(this.article).subscribe();
    }
}