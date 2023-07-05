class Comment < ApplicationRecord

    belongs_to :commenter,
        primary_key: :id,
        foreign_key: :commenter_id,
        class_name: :User
        
    belongs_to :post

    has_many :likes, as: :likeable,
        dependent: :destroy

end
