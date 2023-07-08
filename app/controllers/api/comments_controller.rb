class Api::CommentsController < ApplicationController

    def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.build(comment_params)
        @comment.commenter = current_user

        if @comment.save
            render :show
        else
            render json: {errors: @comment.errors.full_messages}
        end
    end

    def index
        @comments = Comment.includes(:commenter, :likes).where(post_id: params[:post_id])
        render :index
    end

    def update
        @comment = Comment.find(params[:id])
        
    end

    def destroy
        @comment = Comment.find(params[:id])

        if @comment.destroy
            render :show
        else
            render json: {errors: @comment.errors.full_messages}
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:content)
    end
end
