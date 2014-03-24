class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :title
      t.text :description
      t.string :url
      t.decimal :lat
      t.decimal :lng
      t.string :status
      t.string :organisation

      t.timestamps
    end
  end
end
