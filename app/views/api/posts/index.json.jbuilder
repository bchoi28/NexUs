json.posts do
    @posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :author_id, :created_at, :updated_at
            json.photoUrl post.photo.attached? ? post.photo.url : nil
            json.likes do
                post.likes.each do |like|
                    json.set! like.id do
                        json.likerId like.liker_id
                        json.liker do
                            json.id like.liker_id
                            json.fName like.liker.fname
                            json.lName like.liker.lname
                            json.headline like.liker.headline
                            json.pronouns like.liker.pronouns
                            json.photoUrl like.liker.photo.url
                        end
                    end
                end
            end
            json.comments do
                post.comments.each do |comment|
                    json.set! comment.id do
                        json.extract! comment, :id, :content, :created_at, :updated_at
                        json.commenter do
                            json.id comment.commenter.id
                            json.fName comment.commenter.fname
                            json.lName comment.commenter.lname
                            json.headline comment.commenter.headline
                            json.pronouns comment.commenter.pronouns
                            json.photoUrl comment.commenter.photo.url
                        end
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
json.hasMorePosts @has_more_posts
