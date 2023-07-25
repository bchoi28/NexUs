json.connection do
    json.id @connection.id
    json.status @connection.status
    json.connectorId @connection.connector_id
    json.connecteeId @connection.connectee_id
end