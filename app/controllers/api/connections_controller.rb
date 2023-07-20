class Api::ConnectionsController < ApplicationController

    def create
        @connection = Connection.new(connection_params)
        if @connection.save
            render :show
        else
            render json: @connection.errors.full_messages, status: 422
        end
    end

    def index
        @user = current_user
        if params[:pending].present?
            @connection_requests = @user.connection_requests
            render :index_requests
        else
            @connections = @user.connections
            render :index_connections
        end
    end

    def update
        @connection = Connection.find(params[:id])

        if @connection.update(connection_params)
            render :show
        else
            render json: @connection.errors.full_messages, status: 422
        end
    end

    def destroy
        @connection = Connection.find(params[:id])
        if @connection && @connection.destroy
            render :show
        else
            render json: ['Connection could not be deleted'], status:422
        end
    end

    private
    def connection_params
        params.require(:connection).permit(:connector_id, :connectee_id, :status)
    end
end
