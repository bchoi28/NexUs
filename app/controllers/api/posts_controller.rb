class Api::PostsController < ApplicationController

    wrap_parameters include: Post.attribute_names + [:photo]

    def create 
        
        @post = Post.new(post_params)
        @post.author = current_user

        if @post.save
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end

    end

    def index
        page = params[:page].to_i || 1
        per_page = 2

        @posts = Post.includes(:author, :likes, :comments).order(updated_at: :desc).paginate(page: page, per_page: per_page)
        @has_more_posts = @posts.total_pages > page
        render :index

        # if params[:user_id].present? 
        #     user = User.find(params[:user_id])
        #     # @posts = user.posts.order(created_at: :desc)
        #     @posts = user.posts
        #     # renders only that user's posts (recent at top)
        # else
        #     @posts = Post.includes(:author, :likes, :comments).all
        #     render :index
        #     # @posts = Post.includes(:author).order(created_at: :desc)
        #     # renders all of the posts (recent at top)
        # end
    end

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
        if @post
            if params[:remove_photo] == 'true'
                @post.photo.purge_later
                @post.update(post_params)
            else
                @post.update(post_params)
            end
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
