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

    # before_validation :generate_default_pic
    validates :body, presence: true

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    has_one_attached :photo

    # def generate_default_pic
    #     unless self.photo.attached?
    #         # Presumably you have already stored a default pic in your seeds bucket
    #         file = URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/default-profile-image-circle.png");
    #         self.photo.attach(io: file, filename: "default-profile-image-circle.png")
    #     end
    # end
end
