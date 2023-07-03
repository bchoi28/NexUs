json.posts do
    @posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :author_id, :created_at, :updated_at
            json.photoUrl post.photo.attached? ? post.photo.url : nil
            # json.likeCount post.likes.count
            # json.likers post.likes.map{ |like| like.user_id }
            json.likes do
                post.likes.each do |like|
                    json.set! like.id do
                        json.likerId like.user_id
                    end
                end
            end
            json.author do
                json.authorId post.author.id
                json.fName post.author.fname
                json.lName post.author.lname
                json.pronouns post.author.pronouns
                json.headline post.author.headline
                json.photoUrl post.author.photo.url
            end
        end
    end
end