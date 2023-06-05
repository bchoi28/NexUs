class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def show
        debugger
        @user = User.find(params[:id])
        render :show
    end

    def create
        @user = User.new(user_params)
        @user.image_url = '/Users/brandonchoi/Desktop/aA_projects/fs_project/NexUs/frontend/public/images/default-profile-image-circle.png'
            debugger
        if @user.save
            login!(@user)
        # render 'api/users/show'
        render :show
        else
            # debugger
            # { errors: ['error1', 'error2'] } 
            # - check if 'error' contains "Email" as first word
            errors = @user.errors.full_messages.map do |error|
                error.start_with?("Email ") ? error.gsub(/^Email\s/, '') : error
            end
            # debugger
            render json: { errors: errors }, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :fname, :lname, :image_url, :profile_url, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city)
    end
end
