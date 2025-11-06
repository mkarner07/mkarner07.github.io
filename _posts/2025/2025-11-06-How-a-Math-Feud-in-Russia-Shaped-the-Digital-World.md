---
title: "How a Math Feud in Russia Shaped the Digital World"
description: "What do nuclear bombs, Google search, and Solitaire have in common? They originate from a bitter feud between two Russian mathematicians  more than 100 years ago.  Andrey Markov and Pavel Nekrasov had a clash that wasn’t just academic - it was ideological and even political. If you’re a bit into mathematics, you already can guess who won at the end: Markov. Their clash led to one of the most powerful tools in modern science: the Markov chain."
date: 2025-11-06
excerpt_separator: "<!--more-->"
categories:
  - Digital Transformation

tags:
  - Productivity
  - Leadership
  - Digital Transformation
  - Digitalization
  - Artificial Intelligence
  - Methods


---

What do nuclear bombs, Google search, and Solitaire have in common?

They originate from a bitter feud between two Russian mathematicians  more than 100 years ago.  Andrey Markov and Pavel Nekrasov had a clash that wasn’t just academic - it was ideological and even political.

If you’re a bit into mathematics, you already can guess who won at the end: Markov. Their clash led to one of the most powerful tools in modern science: the **Markov chain**.

| ![image](/assets/images/thomas-t-mathematics-unsplash.jpg) |
|:--:|
| *Photo by Thomas T on Unsplash* |

## The law of large numbers

If you think back to your school days and probability class, there is one fundamental assumption: if you repeat events that are independent (that’s important), the average outcome converges to the expected value. An example is flipping a coin. If it is a so called fair coin, it will fall 50 % of the time on heads and 50 % on tails.

The law at work here is the **law of large numbers**, proven by Bernoulli in 1713.

In 1905 Russia was torn between Tsarists and socialists and exactly this principle became a battleground.

Pavel Nekrasov (a Tsarist and very religious) argued that statistical convergence in social data, like marriage or crime rates, proved that the decisions behind them were **independent** and therefore acts of **free will**.

Markov was a socialist and atheist and argued that Nekrasov was misusing the principle and all of mathematics. He set out to prove that **dependent events** could also follow the law of large numbers.

## **Markov’s breakthrough: modeling language**

Markov used literature to prove his point.

He analyzed 20,000 letters from Pushkin’s *Eugene Onegin* and calculated the  frequency of vowels and consonants. Then he examined how often one type followed another.

The results showed clear **dependence**: Certain letter pairs occurred far more often than random chance would predict.

But when he simulated sequences using these dependencies, the overall ratio of vowels to consonants still converged.

This was revolutionary.

Markov had built a **dependent system** that obeyed the law of large numbers. He called it a **Markov chain**. 

The Markov chain is a model where the next state depends only on the current one, not the full history.

With that he had Nekrasov’s: Free will wasn’t necessary for probability. Independence wasn’t either.

### **The Monte Carlo method**

So there was this powerful tool “Markov Chain”, but it got forgotten for a longer period.

It took until 1946 when mathematician Stanislaw Ulam picked it back up. At this time he was recovering from an illness and to make the time pass faster, he played endless games of Solitaire in his bed.

He wondered: what are the odds of winning a randomly shuffled game?

The problem was too complex to solve analytically. But what if you just played hundreds of games and counted the wins?

This idea called “**random sampling**”, became the foundation of the **Monte Carlo method**. 

When Ulam returned to work, he and John von Neumann applied it to model neutron behavior in nuclear reactions.

But unlike Solitaire, neutrons don’t behave independently. Their actions depend on prior states.

So they used **Markov chains** to simulate these interactions, running them on the ENIAC, the world’s first electronic computer.

This allowed them to estimate how much uranium was needed for a bomb without solving (almost) impossible equations.

## **Markov Chains also power the web**

But it is not just nuclear bombs that depend on Markov Chains. In the 1990s, the internet exploded. Search engines like Yahoo ranked pages by keyword frequency. Although it was a straight forward approach, people quickly figured out how to trick it. The algorithm simply lacked a measure for quality.

At Stanford, Larry Page and Sergey Brin realized that web links could act like endorsements. They modeled the web as a **Markov chain**, where each page was a state and each link a transition.

Their algorithm, **PageRank**, calculated the importance of a page based on how often a random surfer would land on it. It was robust against manipulation and became the backbone of **Google**.

### **Predicting text**

Later, Claude Shannon applied Markov chains to text prediction. He showed that by analyzing previous letters or words, you could predict the next one with surprising accuracy.

Today’s LLMs (**large language models**), like those behind Gmail’s autocomplete or ChatGPT, use enhanced versions of Markov chains.

### **The power of memorylessness**

Markov chains work because they’re **memoryless.**

**T**hey only care about the current state. This makes them ideal for modeling complex systems like weather, disease spread, or even shuffling cards.

Fun fact: it takes **seven riffle shuffles** to randomize a deck of 52 cards. That’s a Markov chain in action.

### **From feud to foundation**

Markov’s determination to disprove Nekrasov led to a tool that now powers search engines, nuclear simulations, AI, and more.

As one paper put it:

> “Problem-solving is often a matter of cooking up an appropriate Markov chain.”
> 

---

*Thank you so much for reading my article! I’ve always found the algorithms and their (often simple) roots very interesting. The same was true when I stumbled upon a [Veritasium video](https://www.youtube.com/watch?v=KZeIEiBrT_w) which became the basis of this article.*