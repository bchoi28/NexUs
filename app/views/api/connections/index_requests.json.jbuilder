json.connectionRequests do
    @connection_requests.each do |connection_request|
        connector = connection_request.connector
        json.set! connection_request.id do
            json.connector do
                json.id connector.id
                json.fName connector.fname
                json.lName connector.lname
                json.photoUrl connector.photo.attached? ? connector.photo.url : nil
                json.headline connector.headline
                json.pronouns connector.pronouns
            end
        end
    end
end