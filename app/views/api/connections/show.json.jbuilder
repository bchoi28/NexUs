json.connection do
    json.set! @connection.id do
        json.status @connection.status
        json.connectorId @connection.connector_id
        json.connecteeId @connection.connectee_id
    end
end