echo "🧚‍♀️ Starting logo removal job..."
echo "❌ Deleting output folder..."
rimraf ./output
echo "✅ output folder deleted..."
echo "📁 Creating empty output folder..."
mkdir ./output
echo "🌬️ Looping over folders and images and removing logos..."
npm run start
echo "💫 Job done! 💫"
