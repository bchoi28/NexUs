json.array! @potential_connections do |potential_connection|
  json.id potential_connection.id
  json.headline potential_connection.headline
  json.pronouns potential_connection.pronouns
  json.fName potential_connection.fname
  json.lName potential_connection.lname
end
