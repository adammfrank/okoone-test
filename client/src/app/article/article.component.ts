import { Component } from '@angular/core';
import { ArticleService, Article } from './article.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: './article.component.html'
})



export class ArticleComponent {
    article: Article = {
        _id: '',
        title: '',
        description: '',
        date: ''
    };

    constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute, ) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.articleService.getArticle(params.get('article'))))
            .subscribe((articles: Article[]) => {
                this.article = articles[0];
                this.article.date = new Date(this.article.date).toISOString().split('T')[0]
            });
    }

    submitArticle() {
        this.articleService.storeArticle(this.article).subscribe(() => {
            this.router.navigateByUrl('/profile');
        });
    }
}