source 'https://rubygems.org'

# Minimal plugin set for the v1 theme.
#
# Jekyll auto-requires EVERY gem in the :jekyll_plugins group at boot
# (Bundler.require), so anything listed here is loaded whether or not it's in
# _config.yml's `plugins:`. Keep it lean — this is the whole dependency budget.
group :jekyll_plugins do
  gem 'jekyll'
  gem 'jekyll-sitemap'
  gem 'webrick'
end

# Ruby 4.0.0 dropped these from the default gems, but Jekyll 4.3.x and its deps
# still `require` them (e.g. jekyll.rb requires 'logger'). List them explicitly
# so Bundler installs them and the requires resolve.
gem 'logger'
gem 'csv'
gem 'base64'
gem 'bigdecimal'
gem 'ostruct'
