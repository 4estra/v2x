const logoLink = document.getElementById("logo-link");

if (logoLink) {
  logoLink.addEventListener("click", function (e) {
    e.preventDefault(); // biar gak langsung pindah halaman dulu
    const text = document.querySelector(".twinkle-text");
    const overlay = document.getElementById("transition-overlay");

    text.classList.add("loading-anim");

    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 600);

    setTimeout(() => {
      window.location.href = this.href;
    }, 1500);
  });
}

const overlay = document.getElementById("transition-overlay-intro");
overlay.style.opacity = "1";

window.addEventListener("load", () => {
  setTimeout(() => {
    overlay.style.transition = "opacity 1s ease";
    overlay.style.opacity = "0";
    setTimeout(() => (overlay.style.display = "none"), 1000);
  }, 300);
});

const inviteCode = "6NBHfAYJyR"; // ganti dengan invite kamu
const url = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`;
const proxyUrl =
  "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

fetch(proxyUrl)
  .then((res) => res.json())
  .then((data) => {
    const result = JSON.parse(data.contents);
    console.log(result);

    // isi elemen di HTML
    document.getElementById("server-name").textContent = result.guild.name;
    document.getElementById(
      "member-count"
    ).textContent = `${result.approximate_presence_count} online • ${result.approximate_member_count} total`;

    // icon URL dari invite API
    const iconUrl = `https://cdn.discordapp.com/icons/${result.guild.id}/${result.guild.icon}.png`;
    document.getElementById("discord-icon").src = iconUrl;

    // tombol join
    document.getElementById(
      "join-btn"
    ).href = `https://discord.gg/${inviteCode}`;
  })
  .catch((err) => console.error("Failed to load invite data:", err));
