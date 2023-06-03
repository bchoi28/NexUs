class Api::PostsController < ApplicationController

    def create 
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            render 'api/posts/create'
        else
            render json: @posts.errors.full_messages, status: 422
        end

    end

    def index
        @posts = Post.all
        render 'api/posts/index'
    end

    def show
        @post = Post.find(params[:id])
        if @post
            render 'api/posts/show'
        else
            render json: ['Post not found'], status: 404
        end
    end

    def update
        @post = Post.find(params[:id])
        if @post && @post.update(post_params)
            render 'api/posts/show'
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post && @post.destroy
            render 'api/posts/show'
        else
            render json: ['Post could not be deleted'], status: 422
        end
    end


    private

    def post_params
        params.require(:post).permit(:body, :image_url)
    end
end
