class Api::LikesController < ApplicationController

    def create
        @post = Post.find(params[:post_id])
        debugger
        @like = @post.likes.create(liker: current_user)

        if @like.save
            debugger
            render :show
        else
            render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find(params[:id])
        debugger
        if @like.destroy
            render :show
        else
            render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
    end 

end
