class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
        @user = User.new(user_params)
            
        if @user.save
            login!(@user)
        render 'api/users/show'
        # render :show
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
        params.require(:user).permit(:email, :password, :fname, :lname, :profile_url, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city)
    end
end
