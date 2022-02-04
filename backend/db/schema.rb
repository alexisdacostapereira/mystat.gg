# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_02_092544) do

  create_table "actualities", force: :cascade do |t|
    t.boolean "lolActu", default: true
    t.boolean "valorantActu", default: false
    t.boolean "rocketLeagueActu", default: false
    t.boolean "csGoActu", default: false
    t.boolean "apexActu", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "callOfDutyActu", default: false
    t.boolean "diablo2Actu", default: false
    t.boolean "dota2Actu", default: false
    t.boolean "dbzActu", default: false
    t.boolean "fortniteActu", default: false
    t.boolean "legendsOfRuneterraActu", default: false
    t.boolean "marioKartActu", default: false
    t.boolean "overwatchActu", default: true
    t.boolean "pubgActu", default: true
    t.boolean "rainbowSixActu", default: false
    t.boolean "smashBrosUltimateActu", default: false
    t.boolean "starcraft2Actu", default: false
    t.boolean "streetFighterVActu", default: false
    t.boolean "teamfightTacticsActu", default: false
    t.boolean "tekken7Actu", default: false
    t.boolean "trackmaniaActu", default: false
    t.boolean "warcraft3Actu", default: false
    t.boolean "wowActu", default: false
  end

  create_table "forums", force: :cascade do |t|
    t.string "game"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.string "link"
    t.string "imglink"
    t.string "promo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stats", force: :cascade do |t|
    t.string "pseudo"
    t.string "game"
    t.string "server"
    t.integer "users_id"
    t.string "plateform"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["users_id"], name: "index_stats_on_users_id"
  end

  create_table "stats_connections", force: :cascade do |t|
    t.string "pseudo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "authentication_token", limit: 30
    t.integer "actualities_id"
    t.integer "stats_id"
    t.string "pseudo"
    t.index ["actualities_id"], name: "index_users_on_actualities_id"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["stats_id"], name: "index_users_on_stats_id"
  end

  add_foreign_key "users", "actualities", column: "actualities_id"
  add_foreign_key "users", "stats", column: "stats_id"
end
