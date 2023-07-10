class Api::ExperiencesController < ApplicationController

    def create
        @experience = Experience.new(experience_params)
        @experience.user = current_user

        if @experience.save
            render :show,
        else
            render json: @experience.errors.full_messages, status: 422
        end
    end

    def update
        @experience = Experience.find(params[:id])
        if @experience && @experience.update(experience_params)
            render :show
        else
            render json: @experience.errors.full_messages, status: 422
        end
    end

    def destroy
        @experience = Experience.find(params[:id])
        if @experience && @experience.destroy
            render :show
        else
            render json: ['Experience could not be deleted'], status: 422
        end
    end

    private

    def experience_params
        params.require(:experience).permit(:title, :employment_type, :company_name, :location, :location_type, :start_date, :end_date, :industry, :description, :user_id)
    end

end
