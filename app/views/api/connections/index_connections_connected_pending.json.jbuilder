json.connections do
    if @connections.length > 0
        @connections.each do |connection|
            json.set! connection.id do
                json.status connection.status
                json.connectorId connection.connector_id
                json.connecteeId connection.connectee_id
            end
        end
    else
        json.array! []
    end
end
