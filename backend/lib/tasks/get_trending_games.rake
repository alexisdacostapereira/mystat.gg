require_relative "../../app/services/InstantGamingScraper/getTrendingGames.rb"
include InstantGamingScraper

desc "Get Instant Gaming trending games"
task :get_trending_games do
    InstantGamingScraper::GetTrendingGames.call(1);
end

desc "Get All Instant Gaming games"
task :get_all_games do
    for i in 1..136
        InstantGamingScraper::GetTrendingGames.call(i);
    end
end

