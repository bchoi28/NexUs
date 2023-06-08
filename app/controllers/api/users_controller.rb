class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password'] + [:photo]

    def show
        @user = User.find(params[:id])
        render :show
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

        if @user.update(user_params)
            render :show
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :fname, :lname, :photo, :profile_url, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city)
    end
end
