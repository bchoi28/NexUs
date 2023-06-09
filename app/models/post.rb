# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "open-uri"

class Post < ApplicationRecord

    validates :body, presence: true

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    has_one_attached :photo

    # polymorphic association
    has_many :likes, as: :likeable,
        dependent: :destroy
    
    has_many :comments,
        dependent: :destroy

end
