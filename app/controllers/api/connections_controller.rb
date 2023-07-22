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
            @connected_users = @user.connected_users + @user.connecting_users
            render :index_connections
        end
    end

    def fetch_user_connections
        @user = User.find(params[:id])
        # @user = current_user
        @connected_users = @user.connected_users + @user.connecting_users
        render :index_connections
    end

    def fetch_user_connections_connected_pending
        debugger
        @user = current_user
        @connections = Connection.where("connector_id = :user_id OR (connectee_id = :user_id AND status = 'connected')", user_id: @user.id)
        render :index_connections_connected_pending
    end

    def update
        @connection = Connection.find(params[:id])
        @user = current_user
        if @connection.update(connection_params)
            @connected_users = @user.connected_users + @user.connecting_users
            render :index_connections
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
