class Api::PostsController < ApplicationController

    wrap_parameters include: Post.attribute_names + [:photo]

    def create 
        debugger
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            render :show
        else
            render json: @posts.errors.full_messages, status: 422
        end

    end

    def index
        # debugger
        if params[:user_id].present? 
            # debugger
            user = User.find(params[:user_id])
            # @posts = user.posts.order(created_at: :desc)
            @posts = user.posts
            # renders only that user's posts (recent at top)
        else
            @posts = Post.includes(:author).all
            # @posts = Post.includes(:author).order(created_at: :desc)
            # renders all of the posts (recent at top)
        end
    end

    # custom index to get all posts from one user
    # def index_of_user
    #     user = User.find(params[:user_id])
    #     @posts = user.posts
    #     render :index
    # end

    def show
        @post = Post.find(params[:id])
        if @post
            render :show
        else
            render json: ['Post not found'], status: 404
        end
    end

    def update
        @post = Post.find(params[:id])
        if @post && @post.update(post_params)
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post && @post.destroy
            render :show
        else
            render json: ['Post could not be deleted'], status: 422
        end
    end


    private

    def post_params
        params.require(:post).permit(:body, :photo)
    end
end
