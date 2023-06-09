class Api::LikesController < ApplicationController

    def create
        @post = Post.find(params[:post_id])
        @like = @post.likes.create(user: current_user)

        if @like.save
            render :show
        else
            render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find(params[:id])
  
        if @like.destroy
            render :show
        else
            render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
        end
    end 

end
