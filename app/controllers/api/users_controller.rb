class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password'] + [:photo] + [:cover_photo]

    def show
        @user = User.find(params[:id])
        if params[:likers].present?
            render :likers
        else
            render :show
        end
    end

    def other_users
        user = User.find(params[:user_id])
        @users = User.where.not(id: user.id)
        render :index
    end


    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
        # render 'api/users/show'
        render :show
        else
            # { errors: ['error1', 'error2'] } 
            # - check if 'error' contains "Email" as first word
            errors = @user.errors.full_messages.map do |error|
                error.start_with?("Email ") ? error.gsub(/^Email\s/, '') : error
            end
            render json: { errors: errors }, status: 422
        end
    end

    def update
        @user = User.find(params[:id])
        if params[:user][:remove_cover_photo] == 'true'
            @user.cover_photo.purge_later
        end
        if params[:user][:remove_photo] == 'true'
            @user.photo.purge_later
        end

        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def search
        if params[:query].present?
            @users = User.where('fname LIKE ?', "%#{params[:query]}%")
            render :search
        else
            @users = []
            render json: @users
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :fname, :lname, :photo, :cover_photo, :profile_url, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city)
    end
end
