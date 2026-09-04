(function () {
  const SOURCE_LABELS = {
    x: "X",
    hn: "HN",
    web: "Web",
    github: "GitHub",
  };
  const INTEREST_LABELS = {
    ai: "AI",
    tesla: "Tesla",
    space: "Space",
    spacex: "Space",
    systems: "Systems",
    science: "Science",
  };

  const MASTHEAD_TITLE = "The Daily Diff";
  const MASTHEAD_TAGLINE = "True Signals in a sea of Noise";

  const state = {
    edition: null,
    source: "all",
    interest: "all",
  };

  function bylineAuthors(authors) {
    if (!authors || !authors.length) return "";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" and ");
    return authors[0] + " et al.";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function loadEdition() {
    const response = await fetch("./edition.json", { cache: "no-store" });
    if (!response.ok) throw new Error(String(response.status));
    return await response.json();
  }

  function applyTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        next === "dark" ? "Switch to day edition" : "Switch to night edition"
      );
    }
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    applyTheme(saved || "light");
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      const current = document.documentElement.dataset.theme || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  function renderMasthead(edition, visibleCount) {
    const date = new Date(edition.date + "T00:00:00");
    const dateLabel = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const count = visibleCount == null ? edition.stories.length : visibleCount;
    const countLabel = count + (count === 1 ? " Story" : " Stories");

    document.getElementById("masthead-date").textContent = dateLabel;
    document.getElementById("masthead-story-count").textContent = countLabel;
    document.title = MASTHEAD_TITLE + " | " + MASTHEAD_TAGLINE;
    const colophon = document.getElementById("edition-colophon-date");
    if (colophon) colophon.textContent = dateLabel;
  }

  function filterLabel(id, labels) {
    if (labels[id]) return labels[id];
    return id
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function editionFilterChips(edition, field, labels) {
    const ids = [];
    (edition.stories || []).forEach(function (story) {
      const values = field === "interests" ? story.interests || [] : [story[field]];
      values.forEach(function (value) {
        if (value && ids.indexOf(value) === -1) ids.push(value);
      });
    });
    return [{ id: "all", label: "All" }].concat(
      ids.map(function (id) {
        return { id: id, label: filterLabel(id, labels) };
      })
    );
  }

  function renderFilters() {
    const sourceChips = editionFilterChips(state.edition, "source", SOURCE_LABELS);
    const interestChips = editionFilterChips(state.edition, "interests", INTEREST_LABELS);
    const sourceMount = document.getElementById("source-filter-options");
    const interestMount = document.getElementById("interest-filter-options");
    sourceMount.innerHTML = sourceChips.map(function (chip) {
      return (
        '<button type="button" class="filter-btn' +
        (chip.id === state.source ? " active" : "") +
        '" data-filter="' +
        escapeHtml(chip.id) +
        '">' +
        escapeHtml(chip.label) +
        "</button>"
      );
    }).join("");
    interestMount.innerHTML = interestChips.map(function (chip) {
      return (
        '<button type="button" class="filter-btn' +
        (chip.id === state.interest ? " active" : "") +
        '" data-filter="' +
        escapeHtml(chip.id) +
        '">' +
        escapeHtml(chip.label) +
        "</button>"
      );
    }).join("");

    sourceMount.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.source = btn.getAttribute("data-filter");
        renderFilters();
        applyFilters();
      });
    });
    interestMount.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.interest = btn.getAttribute("data-filter");
        renderFilters();
        applyFilters();
      });
    });

    const sourceText = document.getElementById("source-filter-text");
    const interestText = document.getElementById("interest-filter-text");
    const sourceChip = sourceChips.find(function (c) {
      return c.id === state.source;
    }) || sourceChips[0];
    const interestChip = interestChips.find(function (c) {
      return c.id === state.interest;
    }) || interestChips[0];
    if (sourceText) sourceText.textContent = sourceChip.label;
    if (interestText) interestText.textContent = interestChip.label;
  }

    function renderStories(edition) {
    const mount = document.getElementById("stories");
    mount.innerHTML = edition.stories
      .map(function (story) {
        const classes = ["story"];
        if (story.lead) classes.push("is-lead");
        if (story.featured) classes.push("is-feature");
        classes.push("no-image");
        const authors = bylineAuthors(story.authors);
        const sourceHref = story.source_url || "#";
        const sourceLabel = story.source_label || String(story.source || "").toUpperCase();
        const discuss = story.discuss_url
          ? '<span class="story-source-sep">·</span><a class="story-source-link" href="' +
            escapeHtml(story.discuss_url) +
            '" target="_blank" rel="noopener noreferrer">Discuss</a>'
          : "";
        const byline =
          (authors ? "By " + escapeHtml(authors) + '<span class="story-source-sep">·</span>' : "") +
          '<a class="story-source-link" href="' +
          escapeHtml(sourceHref) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(sourceLabel) +
          "</a>" +
          discuss;
        const body = (story.body || [])
          .map(function (p) {
            return "<p>" + escapeHtml(p) + "</p>";
          })
          .join("");
        return (
          '<article class="' +
          classes.join(" ") +
          '" data-source="' +
          escapeHtml(story.source) +
          '" data-interests="' +
          escapeHtml((story.interests || []).join(" ")) +
          '">' +
          '<h2 class="story-headline"><a href="' +
          escapeHtml(sourceHref) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(story.headline) +
          "</a></h2>" +
          '<div class="story-byline">' +
          byline +
          "</div>" +
          (story.why_read ? '<p class="story-deck">' + escapeHtml(story.why_read) + "</p>" : "") +
          '<div class="story-body">' +
          body +
          "</div></article>"
        );
      })
      .join("");
  }

  function applyFilters() {
    const cards = document.querySelectorAll("#stories .story");
    let visible = 0;
    cards.forEach(function (card) {
      const source = card.getAttribute("data-source");
      const interests = (card.getAttribute("data-interests") || "").split(/\s+/).filter(Boolean);
      const sourceOk = state.source === "all" || source === state.source;
      const interestOk = state.interest === "all" || interests.indexOf(state.interest) !== -1;
      if (sourceOk && interestOk) {
        card.removeAttribute("data-hidden");
        visible += 1;
      } else {
        card.setAttribute("data-hidden", "true");
      }
    });
    const empty = document.getElementById("no-stories-message");
    empty.style.display = visible === 0 ? "block" : "none";
    if (state.edition) renderMasthead(state.edition, visible);
  }

  function initMobileFilters() {
    const groups = document.querySelectorAll(".filter-group");
    groups.forEach(function (group) {
      const trigger = group.querySelector(".filter-mobile-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        const isOpen = group.classList.contains("open");
        groups.forEach(function (other) {
          other.classList.remove("open");
          const otherTrigger = other.querySelector(".filter-mobile-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          group.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", function () {
      groups.forEach(function (group) {
        group.classList.remove("open");
        const trigger = group.querySelector(".filter-mobile-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    });
  }

  initTheme();
  initMobileFilters();

  loadEdition()
    .then(function (edition) {
      state.edition = edition;
      renderMasthead(edition);
      renderFilters();
      renderStories(edition);
      applyFilters();
    })
    .catch(function (err) {
      console.error(err);
      document.getElementById("no-stories-message").style.display = "block";
      document.getElementById("no-stories-message").querySelector("p").textContent =
        "Today's edition could not be loaded.";
    });
})();
