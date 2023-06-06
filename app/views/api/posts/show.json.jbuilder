json.post do
  json.extract! @post, :id, :author_id, :body, :created_at, :updated_at
  json.photoUrl @post.photo.attached? ? @post.photo.url : nil
  json.author do
    json.authorId @post.author.id
    json.fName @post.author.fname
    json.lName @post.author.lname
    json.pronouns @post.author.pronouns
    json.headline @post.author.headline
  end
end