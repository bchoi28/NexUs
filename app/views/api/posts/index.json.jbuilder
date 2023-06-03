json.array! @posts do |post|
  json.extract! post, :id, :body, :image_url, :created_at, :updated_at
  json.author do
    json.fName post.author.fname
    json.lName post.author.lname
    json.imageURL post.author.image_url
  end
end