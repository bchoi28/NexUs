class Api::SessionsController < ApplicationController

    def show
        if current_user
            @user = current_user
            render :show
        else
            render json: { user: nil }
        end
    end

    def create
        user_params = params[:user]
        @user = User.find_by_credentials(user_params[:email], user_params[:password])
        if @user
            login!(@user)
            render :show
        else
            # { errors: ['error', nil] }
            render json: {errors: User.login_errors(user_params)}, status: 401
        end
    end

    def destroy
        logout!
        render json: { message: 'success' }
    end 

end
