(function (app) {

    let Validate = app.Validate;

    class ViewPost extends app.views.ViewBase {

        constructor() {
            super();
            this.tpl = document.querySelector("#view-post-tpl");
            this.container = document.querySelector('.main-container');
        }

        preRender(post) {
            this.render(post, this.tpl.innerHTML, this.container);

            let btnAddComment = this.container.querySelector('.btn-add-comment');
            let btnBack = this.container.querySelector('.btn-back');
            let form = document.forms['add-comment-form'];

            let validator = new Validate(form);

            btnAddComment.addEventListener('click', () => {
                validator.checkForm((data) => {
                    this.addComment(post, data);
                });
            });

            btnBack.addEventListener('click', () => {
                window.history.back();
            });
        }

        addComment(post, comment) {
            document.dispatchEvent(new CustomEvent(
                'add-comment',
                {detail: {post, comment}}
            ))
        }
    }

    app.views.ViewPost = ViewPost;

})(App);